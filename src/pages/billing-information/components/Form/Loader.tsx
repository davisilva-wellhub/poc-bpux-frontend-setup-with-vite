import { Skeleton } from '@gympass/tai-chi'
import { Box, Grid } from '@mui/material'

export const FormLoader = () => (
  <>
    <Box mb={7} data-testid="form-loader">
      <Skeleton variant="rounded" width="30%" height={20} />

      <Grid container spacing={5} mt={1}>
        <Grid item xs={12}>
          <Skeleton variant="rounded" width="100%" height={40} />
        </Grid>
      </Grid>
    </Box>

    <Skeleton variant="rounded" width="30%" height={20} />

    <Grid container spacing={5} mt={1} mb={8}>
      <Grid item xs={12}>
        <Skeleton variant="rounded" width="100%" height={40} />
      </Grid>
      <Grid item xs={4}>
        <Skeleton variant="rounded" width="100%" height={40} />
      </Grid>
      <Grid item xs={8}>
        <Skeleton variant="rounded" width="100%" height={40} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="rounded" width="100%" height={40} />
      </Grid>
      <Grid item xs={6}>
        <Skeleton variant="rounded" width="100%" height={40} />
      </Grid>
      <Grid item xs={6}>
        <Skeleton variant="rounded" width="100%" height={40} />
      </Grid>
    </Grid>

    <Skeleton variant="rounded" width="100%" height={40} />
  </>
)
