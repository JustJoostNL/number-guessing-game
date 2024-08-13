import { Container } from "@mui/material";
import { ContentLayout } from "@/components/layouts/ContentLayout";
import { Settings } from "@/components/settings/Settings";

export default function SettingsPage() {
  return (
    <ContentLayout title="Settings" titleVariant="h2">
      <Container
        sx={{
          mt: 3,
        }}
      >
        <Settings />
      </Container>
    </ContentLayout>
  );
}
