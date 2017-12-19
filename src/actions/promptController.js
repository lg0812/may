export const promptOp = (args) => (dispatch) => {
    console.log(args);
    dispatch({
        type: args.type,
        status: args.status
    });
}
