import { useEffect, useMemo, useState } from "react";
import { Alert, Box, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchItemsThunk } from "../features/items/itemsThunks";
import { clearSession } from "../features/auth/authSlice";
import { persistor } from "../store";

import { withPageTitle } from "../hoc/withPageTitle";
import { AppHeader } from "../ui/AppHeader";
import { PageContainer } from "../ui/PageContainer";
import { useDebounce } from "../hooks/useDebounce";

const HomePageBase = () => {
  const dispatch = useAppDispatch();
  const email = useAppSelector((s) => s.auth.email);
  const { items, loading, error } = useAppSelector((s) => s.items);

  // Filtros por columnas
  const [nameFilter, setNameFilter] = useState("");
  const [urlFilter, setUrlFilter] = useState("");

  // debounce para no recalcular/filtrar por cada tecla inmediatamente
  const debouncedName = useDebounce(nameFilter);
  const debouncedUrl = useDebounce(urlFilter);

  useEffect(() => {
    dispatch(fetchItemsThunk({ limit: 2000 }));
  }, [dispatch]);

  // Limpiar sesión y borrar datos de persistencia
  const onLogout = async () => {
    dispatch(clearSession());
    await persistor.purge();
  };

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "index", headerName: "#", width: 80 },
      { field: "name", headerName: "Name", flex: 1, minWidth: 180 },
      { field: "url", headerName: "URL", flex: 2, minWidth: 280 },
    ],
    []
  );

  const filteredRows = useMemo(() => {
    const n = debouncedName.trim().toLowerCase();
    const u = debouncedUrl.trim().toLowerCase();

    return items
      .filter((item) => (n ? item.name.toLowerCase().includes(n) : true))
      .filter((item) => (u ? item.url.toLowerCase().includes(u) : true))
      .map((item, idx) => ({
        id: item.url, // la url es el campo unico en la api de listar
        index: idx + 1,
        name: item.name,
        url: item.url,
      }));
  }, [items, debouncedName, debouncedUrl]);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AppHeader title="Home" subtitle={email ? `Sesión: ${email}` : undefined} onLogout={onLogout} />

      <PageContainer>
        <Stack spacing={2}>
          <Typography variant="h6">Lista (2000 elementos)</Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Filter: name"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              fullWidth
            />
            <TextField
              label="Filter: url"
              value={urlFilter}
              onChange={(e) => setUrlFilter(e.target.value)}
              fullWidth
            />
          </Stack>

          {error ? <Alert severity="error">{error}</Alert> : null}

          <Box sx={{ height: 650, width: "100%" }}>
            {loading ? (
              <Stack alignItems="center" justifyContent="center" sx={{ height: "100%" }}>
                <CircularProgress />
              </Stack>
            ) : (
              <DataGrid
                rows={filteredRows}
                columns={columns}
                density="compact"
                disableRowSelectionOnClick
                pageSizeOptions={[25, 50, 100]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 50, page: 0 } },
                }}
              />
            )}
          </Box>
        </Stack>
      </PageContainer>
    </Box>
  );
};

export const HomePage = withPageTitle("Home | React SPA Challenge", HomePageBase);
