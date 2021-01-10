export const config = {
  winston: {
    dirname: `${__dirname}../config`,
    filename: "log.log",
    maxFiles: 5,
    maxsize: 5120000,
  },
};
