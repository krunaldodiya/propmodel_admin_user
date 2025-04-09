/**********************************
 * Desc: Provide services for test module.
 * Auth: Krunal Dodiya
 * Date: 09/04/2025
 **********************************/

const greet = async (params = {}, tokenData) => {
  try {
    return "hello world";
  } catch (error) {
    console.error(error);
    throw new Error("Challenges fetch failed");
  }
};

export default {
  greet,
};
