export const config: Config = {
  profiles: [

    // -------------------------------------------------------------------------
    // Metadata Repo access profiles
    // Tailscale tags: metadata-repo-dev, metadata-repo-qa, metadata-repo-stage, metadata-repo-prod
    // Posture grants access via srcPosture in ACL grants.
    // -------------------------------------------------------------------------
    {
      description: "Metadata Repo: Dev Access",
      // ACL: tag:metadata-repo-dev — port 5432 (Postgres)
      // Admin group: group:ts-metadata-repo-dev-admins
      attribute: "custom:metadataRepoDevAccess",
      maxSeconds: 3 * 86400, // 3 days
      approverEmails: [
        "chaitanya.naik@tessell.com",
        "sreejith.kesavan@tessell.com",
        "sagar.sontakke@tessell.com",
        "sundeep.gupta@tessell.com"
      ],
      // notifyChannel: "",
    },
    {
      description: "Metadata Repo: QA Access",
      // ACL: tag:metadata-repo-qa — port 5432 (Postgres)
      // Posture used by: group:ts-monitoring-dashboard-qa-users (see posture:accessbotTestPosture)
      attribute: "custom:metadataRepoQaAccess",
      maxSeconds: 3 * 86400, // 3 days
      approverEmails: [
        "vivekanandan.nataraj@tessell.com",
      ],
      // notifyChannel: "",
    },
    {
      description: "Metadata Repo: Stage Access",
      // ACL: tag:metadata-repo-stage — port 5432 (Postgres)
      // Regular approvers: group:ts-metadata-repo-stage-admins, group:ts-metadata-repo-stage-dba
      attribute: "custom:metadataRepoStageAccess",
      maxSeconds: 3 * 86400, // 3 days
      approverEmails: [
        "sreejith.kesavan@tessell.com",
        "sagar.sontakke@tessell.com",
        "srivatsan.vijayaraghavan@tessell.com"
      ],
      // notifyChannel: "",
    },
    {
      description: "Metadata Repo: Production Access",
      // ACL: tag:metadata-repo-prod — tightly restricted
      // Approvers: group:ts-metadata-repo-prod-admins, group:ts-metadata-repo-prod-dba
      attribute: "custom:metadataRepoProdAccess",
      maxSeconds: 8 * 3600, // 8 hours — shorter window for production
      approverEmails: [
        "sreejith.kesavan@tessell.com",
        "sagar.sontakke@tessell.com",
        "srivatsan.vijayaraghavan@tessell.com",
        "maneesh.rawat@tessell.com"
      ],
      canSelfApprove: false,
      // notifyChannel: "",
    },

    // -------------------------------------------------------------------------
    // Monitoring Dashboard access profiles
    // Covers: K8s dashboards, Prometheus, Pushgateway, VictoriaMetrics
    //   Dev tags  : tessell-k8s-dashboard-devqa (combined), vmalert/vmagent/vmselect-k8s-infra-dev
    //               Note: ports 8080, 8429, 8481 already open to autogroup:member
    //   QA tags  : tessell-k8s-dashboard-qa, tessell-prometheus-dashboard-qa,
    //              tessell-pushgateway-dashboard-qa, vmalert/vmagent/vmselect-k8s-infra-qa
    //   Stage tags: tessell-k8s-dashboard-stage, tessell-prometheus-dashboard-stage,
    //              tessell-pushgateway-dashboard-stage, vmalert/vmagent/vmselect-k8s-infra-stage
    //   Prod tags : tessell-k8s-dashboard-prod, tessell-prometheus-dashboard-prod,
    //              tessell-pushgateway-dashboard-prod, vmalert/vmagent/vmselect-k8s-infra-prod
    // -------------------------------------------------------------------------
    {
      description: "Dashboards: Dev Access",
      // ACL: tag:tessell-k8s-dashboard-devqa (combined dev+qa dashboard)
      //      tag:vmalert/vmagent/vmselect-k8s-infra-dev (all ports)
      attribute: "custom:dashboardsDevAccess",
      maxSeconds: 3 * 86400, // 3 days
      approverEmails: [
        "sreejith.kesavan@tessell.com",
        "chaitanya.naik@tessell.com"
      ],
      // notifyChannel: "",
    },
    {
      description: "Dashboards: QA Access",
      // ACL: group:ts-monitoring-qa-admins has full access to all QA dashboards
      attribute: "custom:dashboardsQaAccess",
      maxSeconds: 3 * 86400, // 3 days
      approverEmails: [
        "vivekanandan.nataraj@tessell.com",
      ],
      // notifyChannel: "",
    },
    {
      description: "Dashboards: Stage Access",
      // ACL: group:ts-monitoring-stage-admins has full access to all Stage dashboards
      attribute: "custom:dashboardsStageAccess",
      maxSeconds: 3 * 86400, // 3 days
      approverEmails: [
        "sreejith.kesavan@tessell.com",
        "sundeep.gupta@tessell.com",
        "srivatsan.vijayaraghavan@tessell.com"
      ],
      // notifyChannel: "",
    },
    {
      description: "Dashboards: Production Access",
      // ACL: group:ts-monitoring-prod-admins has full access to all Prod dashboards
      // Note: Public ports (9090, 9091, 8080, 8429, 8481) are open to autogroup:member already
      attribute: "custom:dashboardsProdAccess",
      maxSeconds: 8 * 3600, // 8 hours — shorter window for production
      approverEmails: [
        "sreejith.kesavan@tessell.com",
        "sundeep.gupta@tessell.com",
        "srivatsan.vijayaraghavan@tessell.com"
      ],
      canSelfApprove: false,
      // notifyChannel: "",
    },

    // -------------------------------------------------------------------------
    // Kubernetes Cluster access profiles
    // Covers admin and readonly access to kube-api-server per environment.
    //   Dev tags  : dev-kube-api-server-with-{admin,readonly}-access  (ports 80, 8001)
    //               Note: Dev admin already open to autogroup:member — only readonly needs a profile.
    //   QA tags  : qa-kube-api-server-with-{admin,readonly}-access  (ports 80, 8001)
    //   Stage tags: stage-kube-api-server-with-{admin,readonly}-access
    //   Prod tags : prod-kube-api-server-with-{admin,readonly}-access
    // -------------------------------------------------------------------------
    {
      description: "K8s Cluster: Dev Admin Access",
      // ACL: autogroup:member removed from existing grant; posture gates JIT admin access
      // Explicit group: group:ts-dev-cluster-admins retains permanent access
      attribute: "custom:k8sDevAdminAccess",
      maxSeconds: 3 * 86400, // 3 days
      approverEmails: [
        "sreejith.kesavan@tessell.com",
        "chaitanya.naik@tessell.com",
        "sundeep.gupta@tessell.com"
      ],
      // notifyChannel: "",
    },
    {
      description: "K8s Cluster: Dev Readonly Access",
      // ACL: group:ts-dev-cluster-readonly-users → tag:dev-kube-api-server-with-readonly-access
      attribute: "custom:k8sDevReadonlyAccess",
      maxSeconds: 3 * 86400, // 3 days
      approverEmails: [
        "sreejith.kesavan@tessell.com",
        "chaitanya.naik@tessell.com",
        "sundeep.gupta@tessell.com"
      ],
      // notifyChannel: "",
    },
    {
      description: "K8s Cluster: QA Admin Access",
      // ACL: group:ts-qa-cluster-admins → tag:qa-kube-api-server-with-admin-access
      attribute: "custom:k8sQaAdminAccess",
      maxSeconds: 3 * 86400, // 3 days
      approverEmails: [
        "sreejith.kesavan@tessell.com",
        "chaitanya.naik@tessell.com",
        "sundeep.gupta@tessell.com",
        "vivekanandan.nataraj@tessell.com"
      ],
      // notifyChannel: "",
    },
    {
      description: "K8s Cluster: QA Readonly Access",
      // ACL: group:ts-qa-cluster-readonly-users → tag:qa-kube-api-server-with-readonly-access
      attribute: "custom:k8sQaReadonlyAccess",
      maxSeconds: 3 * 86400, // 3 days
      approverEmails: [
        "sreejith.kesavan@tessell.com",
        "chaitanya.naik@tessell.com",
        "sundeep.gupta@tessell.com",
        "vivekanandan.nataraj@tessell.com"
      ],
      // notifyChannel: "",
    },
    {
      description: "K8s Cluster: Stage Admin Access",
      // ACL: group:ts-stage-cluster-admins → tag:stage-kube-api-server-with-admin-access
      attribute: "custom:k8sStageAdminAccess",
      maxSeconds: 3 * 86400, // 3 days
      approverEmails: [
        "sreejith.kesavan@tessell.com",
        "chaitanya.naik@tessell.com",
        "sundeep.gupta@tessell.com",
        "srivatsan.vijayaraghavan@tessell.com"
      ],
      // notifyChannel: "",
    },
    {
      description: "K8s Cluster: Stage Readonly Access",
      // ACL: group:ts-stage-cluster-readonly-users → tag:stage-kube-api-server-with-readonly-access
      attribute: "custom:k8sStageReadonlyAccess",
      maxSeconds: 3 * 86400, // 3 days
      approverEmails: [
        "sreejith.kesavan@tessell.com",
        "chaitanya.naik@tessell.com",
        "sundeep.gupta@tessell.com",
        "srivatsan.vijayaraghavan@tessell.com"
      ],
      // notifyChannel: "",
    },
    {
      description: "K8s Cluster: Production Admin Access",
      // ACL: group:ts-prod-cluster-admins → tag:prod-kube-api-server-with-admin-access
      attribute: "custom:k8sProdAdminAccess",
      maxSeconds: 8 * 3600, // 8 hours — shorter window for production
      approverEmails: [
        "sreejith.kesavan@tessell.com",
        "chaitanya.naik@tessell.com",
        "sundeep.gupta@tessell.com",
        "srivatsan.vijayaraghavan@tessell.com"
      ],
      canSelfApprove: false,
      // notifyChannel: "",
    },
    {
      description: "K8s Cluster: Production Readonly Access",
      // ACL: group:ts-prod-cluster-readonly-users → tag:prod-kube-api-server-with-readonly-access
      attribute: "custom:k8sProdReadonlyAccess",
      maxSeconds: 8 * 3600, // 8 hours
      approverEmails: [
        "sreejith.kesavan@tessell.com",
        "chaitanya.naik@tessell.com",
        "sundeep.gupta@tessell.com",
        "srivatsan.vijayaraghavan@tessell.com"
      ],
      // notifyChannel: "",
    },

    // -------------------------------------------------------------------------
    // OPS Platform access profiles
    // Covers: ops-app, ops-mongo, ops-pgsync (dev and prod)
    // -------------------------------------------------------------------------
    {
      description: "OPS Platform: Dev Access",
      // ACL: group:ts-ops-platform-dev → ops-metabase-dev, ops-metabase-qa
      // Covers: ops-app-dev, ops-mongo-dev, ops-pgsync-dev
      attribute: "custom:opsPlatformDevAccess",
      maxSeconds: 3 * 86400, // 3 days
      approverEmails: [
        "chaitanya.naik@tessell.com",
        "sreejith.kesavan@tessell.com"
      ],
      // notifyChannel: "",
    },
    {
      description: "OPS Platform: Production Access",
      // ACL: group:ts-tessell-ops-prod-admins → ops-mongo-prod, tessell-ops-lambda-prod, etc.
      // ACL: group:ts-ops-platform-admins → ops-pgsync-prod
      attribute: "custom:opsPlatformProdAccess",
      maxSeconds: 8 * 3600, // 8 hours
      approverEmails: [
        "sreejith.kesavan@tessell.com",
        "chaitanya.naik@tessell.com",
        "srivatsan.vijayaraghavan@tessell.com"
      ],
      canSelfApprove: false,
      // notifyChannel: "",
    },

    // -------------------------------------------------------------------------
    // Infra Repo access profiles
    // tag:infra-repo — MS Metadata / infra repo Postgres DB
    // -------------------------------------------------------------------------
    {
      description: "Mothersite Repo: DBA Access",
      // ACL: group:ts-infra-repo-dba → tag:infra-repo port 5432
      attribute: "custom:infraRepoDbaAccess",
      maxSeconds: 3 * 86400, // 3 days
      approverEmails: [
        "sreejith.kesavan@tessell.com",
        "chaitanya.naik@tessell.com",
        "sundeep.gupta@tessell.com",
      ],
      // notifyChannel: "",
    },
    {
      description: "Mothersite Repo: Admin Access",
      // ACL: group:ts-infra-repo-admin → tag:infra-repo all ports
      attribute: "custom:infraRepoAdminAccess",
      maxSeconds: 86400, // 1 day
      approverEmails: [
        "sreejith.kesavan@tessell.com",
        "chaitanya.naik@tessell.com",
        "sundeep.gupta@tessell.com",
        "srivatsan.vijayaraghavan@tessell.com"
      ],
      canSelfApprove: false,
      // notifyChannel: "",
    },
  ],
};

export type Config = {
  /**
   * Profiles must be a non-empty set of configuration.
   */
  profiles: [Profile, ...Profile[]];
};

export type Profile = {
  /**
   * The human-readable name for the profile being granted access to by the attribute.
   * @example "Production"
   */
  description: string;
  /**
   * The tailscale attribute added to a device for the selected duration, upon
   * the request being approved.
   */
  attribute: string;

  /**
   * The maximum duration to offer the user when they are requesting access to
   * this profile.
   * @default 86400 (1 day, can be increased to 7*86400 for 7 days)
   */
  maxSeconds?: number;
  /**
   * The channel identifier to post approve/deny updates to.
   * @example "CQ12VV345"
   * @default undefined (meaning no public channel updates)
   */
  notifyChannel?: string;

  /**
   * Email addresses of people who may approve an access request. These are
   * looked-up to find the relevant slack users.
   * @default undefined (meaning anybody can approve)
   */
  approverEmails?: string[];

  /**
   * Whether a user can mark themselves as the approver for a request.
   * @default false
   */
  canSelfApprove?: boolean;

  /**
   * Whether a user self-approving is prompted to approve their own access
   * request. Can be set to true to show them the prompt anyway.
   * @default false (skip self-approval)
   */
  confirmSelfApproval?: boolean;
};
