import { Badge } from "@shopify/polaris";

export default ({ active }: { active: boolean }) =>
  active ? <Badge status="success">Active</Badge> : <Badge status="warning">Deactivated</Badge>;
