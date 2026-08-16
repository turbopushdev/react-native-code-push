export interface DeploymentStatusReport {
  app_version: string;
  client_unique_id?: string;
  deployment_key: string;
  previous_deployment_key?: string;
  previous_label_or_app_version?: string;
  label?: string;
  status?: string;
}

export interface DownloadReport {
  client_unique_id: string;
  deployment_key: string;
  label: string;
}

export interface UpdateCheckResponse {
  download_url?: string;
  description?: string;
  is_available: boolean;
  is_disabled?: boolean;
  target_binary_range: string;
  label?: string;
  package_hash?: string;
  package_size?: number;
  should_run_binary_version?: boolean;
  update_app_version?: boolean;
  is_mandatory?: boolean;
}

export interface UpdateCheckRequest {
  app_version: string;
  client_unique_id?: string;
  deployment_key: string;
  is_companion?: boolean;
  label?: string;
  package_hash?: string;
}
