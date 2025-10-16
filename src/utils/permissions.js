export const permissionsJson = [
  {
    key: "manifest",
    children: [
      {
        key: "manifestOrders",
        permissions: ["VIEW", "FILE_DOWNLOAD"],
      },
      {
        key: "warehouse",
        permissions: ["VIEW", "UPDATE", "CREATE"],
      },
      {
        key: "stores",
        permissions: [
          "VIEW",
          "UPDATE",
          "CREATE",
          "DELETE",
          "FILE_UPLOAD",
          "FILE_DOWNLOAD",
        ],
      },
      {
        key: "createOrder",
        permissions: ["VIEW", "UPDATE", "FILE_UPLOAD", "FILE_DOWNLOAD"],
      },
    ],
  },
  {
    key: "dispatch",
    children: [
      {
        key: "dispatchOrders",
        permissions: [
          "VIEW",
          "CREATE",
          "UPDATE",
          "FILE_UPLOAD",
          "FILE_DOWNLOAD",
        ],
      },
      {
        key: "courierMapping",
        permissions: ["VIEW", "UPDATE", "CREATE", "DELETE"],
      },
      {
        key: "warehouseMapping",
        permissions: ["UPDATE", "CREATE", "DELETE", "VIEW"],
      },
      {
        key: "dispatchTabs",
        permissions: ["VIEW", "CREATE", "UPDATE"],
      },
    ],
  },
  {
    key: "analytics",
    children: [
      {
        key: "analyticsOverview",
        permissions: ["VIEW", "FILE_DOWNLOAD"],
      },
      {
        key: "stuckShipment",
        permissions: ["VIEW", "CREATE"],
      },
      {
        key: "zoneAnalysis",
        permissions: ["VIEW", "FILE_DOWNLOAD"],
      },
      {
        key: "returnsAnalysis",
        permissions: ["VIEW", "FILE_DOWNLOAD"],
      },
      {
        key: "inTransitOrders",
        permissions: ["VIEW", "FILE_DOWNLOAD"],
      },
      {
        key: "nps",
        permissions: ["FILE_DOWNLOAD", "VIEW"],
      },
      {
        key: "proofOfDelivery",
        permissions: ["VIEW", "FILE_DOWNLOAD"],
      },
    ],
  },
  {
    key: "returns",
    children: [
      {
        key: "nprQuickAction",
        permissions: ["VIEW", "UPDATE"],
      },
      {
        key: "nprManagement",
        permissions: ["VIEW", "FILE_DOWNLOAD", "VIEW", "UPDATE"],
      },
      {
        key: "returnManagement",
        permissions: [
          "VIEW",
          "UPDATE",
          "FILE_DOWNLOAD",
          "DELETE",
          "CREATE",
          "VIEW",
        ],
      },
      {
        key: "exchangeManagement",
        permissions: ["VIEW", "UPDATE", "FILE_DOWNLOAD", "DELETE", "CREATE"],
      },
      {
        key: "advancedReturnConfig",
        permissions: ["VIEW", "CREATE", "UPDATE"],
      },
      {
        key: "advancedExchangeConfig",
        permissions: ["VIEW", "CREATE", "UPDATE"],
      },
      {
        key: "nprBulkAction",
        permissions: ["VIEW", "UPDATE"],
      },
      {
        key: "rneIntelligence",
        permissions: ["VIEW"],
      },
    ],
  },
  {
    key: "track",
    children: [
      {
        key: "trackOrders",
        permissions: ["VIEW", "FILE_DOWNLOAD", "UPDATE"],
      },
      {
        key: "uploadToTrack",
        permissions: ["VIEW", "FILE_UPLOAD"],
      },
      {
        key: "manualStatusUpdate",
        permissions: ["VIEW", "UPDATE", "FILE_UPLOAD"],
      },
      {
        key: "riderAllocation",
        permissions: ["VIEW", "UPDATE"],
      },
      {
        key: "proofOfDelivery",
        permissions: ["VIEW", "FILE_DOWNLOAD"],
      },
      {
        key: "trackingLatency",
        permissions: ["VIEW"],
      },
      {
        key: "trackOrdersBucketConfiguration",
        permissions: ["UPDATE", "VIEW"],
      },
      {
        key: "trackOrdersFiltersEnabled",
        permissions: ["VIEW"],
      },
    ],
  },
  {
    key: "allocation",
    children: [
      {
        key: "allocationRule",
        permissions: ["VIEW", "UPDATE", "CREATE", "DELETE"],
      },
      {
        key: "courierAllocation",
        permissions: ["VIEW"],
      },
    ],
  },
  {
    key: "accessControl",
    children: [
      {
        key: "users",
        permissions: ["VIEW", "UPDATE", "CREATE"],
      },
      {
        key: "roles",
        permissions: ["VIEW", "CREATE", "UPDATE", "DELETE"],
      },
      {
        key: "piiData",
        permissions: ["VIEW"],
      },
    ],
  },
  {
    key: "ndr",
    children: [
      {
        key: "ndrCases",
        permissions: ["UPDATE", "FILE_DOWNLOAD", "VIEW"],
      },
      {
        key: "ndrPerformanceBoard",
        permissions: ["VIEW", "UPDATE", "FILE_DOWNLOAD"],
      },
      {
        key: "ndrUserAllocationConfig",
        permissions: ["FILE_DOWNLOAD", "VIEW", "UPDATE", "FILE_UPLOAD"],
      },
      {
        key: "ndrReports",
        permissions: ["FILE_UPLOAD", "FILE_DOWNLOAD", "VIEW", "UPDATE"],
      },
      {
        key: "ndrAutomationConfig",
        permissions: ["VIEW", "UPDATE", "CREATE", "DELETE"],
      },
      {
        key: "ndrAllCases",
        permissions: ["VIEW"],
      },
      {
        key: "ndrQuickAction",
        permissions: ["VIEW", "UPDATE"],
      },
      {
        key: "ndrBulkAction",
        permissions: ["VIEW", "UPDATE"],
      },
      {
        key: "ndrNotificationsWorkflow",
        permissions: ["VIEW", "CREATE", "UPDATE", "DELETE"],
      },
      {
        key: "ndrApiEfficiency",
        permissions: ["VIEW"],
      },
    ],
  },
  {
    key: "courier",
    children: [
      {
        key: "courierIntegration",
        permissions: [
          "VIEW",
          "UPDATE",
          "FILE_UPLOAD",
          "FILE_DOWNLOAD",
          "CREATE",
        ],
      },
      {
        key: "holidayConfig",
        permissions: ["VIEW", "CREATE"],
      },
      {
        key: "labelConfig",
        permissions: ["CREATE", "VIEW", "UPDATE"],
      },
      {
        key: "addressMapper",
        permissions: ["VIEW", "FILE_UPLOAD", "FILE_DOWNLOAD"],
      },
    ],
  },
  {
    key: "notification",
    children: [
      {
        key: "notificationOverview",
        permissions: ["VIEW", "UPDATE", "CREATE", "DELETE"],
      },
      {
        key: "webhook",
        permissions: ["VIEW", "UPDATE", "CREATE", "DELETE"],
      },
      {
        key: "whatsApp",
        permissions: ["VIEW", "CREATE", "UPDATE", "DELETE", "FILE_DOWNLOAD"],
      },
      {
        key: "sms",
        permissions: ["VIEW", "CREATE", "UPDATE", "DELETE", "FILE_DOWNLOAD"],
      },
      {
        key: "ivrs",
        permissions: ["VIEW", "CREATE", "UPDATE", "DELETE", "FILE_DOWNLOAD"],
      },
      {
        key: "email",
        permissions: ["VIEW", "CREATE", "UPDATE", "DELETE", "FILE_DOWNLOAD"],
      },
      {
        key: "marketing",
        permissions: ["FILE_DOWNLOAD", "VIEW", "CREATE", "UPDATE", "DELETE"],
      },
    ],
  },
  {
    key: "misc",
    children: [
      {
        key: "getlog",
        permissions: ["VIEW"],
      },
      {
        key: "codReconciliation",
        permissions: ["VIEW", "FILE_UPLOAD", "FILE_DOWNLOAD"],
      },
      {
        key: "invoiceReconciliation",
        permissions: ["VIEW", "FILE_UPLOAD"],
      },
    ],
  },
  {
    key: "theme",
    children: [
      {
        key: "themeConfig",
        permissions: ["VIEW", "UPDATE", "FILE_UPLOAD"],
      },
    ],
  },
  {
    key: "exchangeConfig",
    children: [
      {
        key: "exchangeConfig",
        permissions: ["UPDATE", "VIEW", "FILE_UPLOAD", "FILE_DOWNLOAD"],
      },
    ],
  },
  {
    key: "returnSettings",
    children: [
      {
        key: "returnConfig",
        permissions: ["VIEW", "UPDATE"],
      },
    ],
  },
  {
    key: "channel",
    children: [
      {
        key: "channelConfig",
        permissions: ["VIEW", "UPDATE", "CREATE"],
      },
    ],
  },
  {
    key: "edd",
    children: [
      {
        key: "eddConfig",
        permissions: ["UPDATE", "VIEW", "CREATE"],
      },
    ],
  },
  {
    key: "dashboard",
    children: [
      {
        key: "dashboardOverview",
        permissions: ["FILE_DOWNLOAD", "VIEW", "VIEW_BILLING_INFO"],
      },
    ],
  },
  {
    key: "cancelOrders",
    children: [
      {
        key: "uploadCancel",
        permissions: ["UPDATE"],
      },
      {
        key: "searchCancel",
        permissions: ["VIEW", "UPDATE"],
      },
      {
        key: "cancelOrderHistory",
        permissions: ["VIEW"],
      },
    ],
  },
  {
    key: "controlTower",
    children: [
      {
        key: "controlTowerForward",
        permissions: ["VIEW", "FILE_DOWNLOAD"],
      },
      {
        key: "controlTowerConfiguration",
        permissions: ["UPDATE", "VIEW"],
      },
      {
        key: "controlTowerReverse",
        permissions: ["VIEW", "FILE_DOWNLOAD"],
      },
      {
        key: "controlTowerRTOMovement",
        permissions: ["VIEW", "FILE_DOWNLOAD"],
      },
      {
        key: "controlTowerQuickCommerce",
        permissions: ["VIEW", "FILE_DOWNLOAD"],
      },
    ],
  },
  {
    key: "appointments",
    children: [
      {
        key: "manageAppointments",
        permissions: [
          "VIEW",
          "CREATE",
          "UPDATE",
          "FILE_DOWNLOAD",
          "FILE_UPLOAD",
        ],
      },
    ],
  },
  {
    key: "npr",
    children: [
      {
        key: "nprJourneyWorkFlow",
        permissions: ["CREATE", "VIEW", "UPDATE"],
      },
      {
        key: "nprUserAllocation",
        permissions: ["UPDATE", "VIEW"],
      },
      {
        key: "nprAutomationConfig",
        permissions: ["VIEW", "CREATE", "UPDATE", "DELETE"],
      },
      {
        key: "nprPerformanceBoard",
        permissions: ["VIEW", "FILE_DOWNLOAD"],
      },
      {
        key: "nprAllCases",
        permissions: ["VIEW"],
      },
      {
        key: "nprReports",
        permissions: ["VIEW", "UPDATE", "FILE_DOWNLOAD"],
      },
    ],
  },
  {
    key: "industryBenchmarking",
    children: [
      {
        key: "industryInsights",
        permissions: ["VIEW"],
      },
    ],
  },
  {
    key: "reports",
    children: [
      {
        key: "reportsDashboard",
        permissions: ["VIEW", "FILE_DOWNLOAD", "CREATE", "UPDATE", "DELETE"],
      },
      {
        key: "reportsScheduling",
        permissions: ["VIEW", "UPDATE"],
      },
      {
        key: "reportsConfiguration",
        permissions: ["UPDATE", "VIEW"],
      },
    ],
  },
];
