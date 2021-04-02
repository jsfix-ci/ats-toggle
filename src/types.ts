export type ExpectedPlistModel = {
  NSAppTransportSecurity: {
    NSAllowsArbitraryLoads: boolean;
    NSExceptionDomains?: {
      localhost: {
        NSExceptionAllowsInsecureHTTPLoads: boolean;
      };
    };
  };
};

export type Runtime = {
  model: ExpectedPlistModel;
  targetFile: string;
};
