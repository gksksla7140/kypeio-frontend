import LinkButton from "@/components/common/LinkButton";
import CustomButton from "@/components/common/CustomButton";
import { joinGame } from "@/actions/game-actions";
import { redirect } from "next/navigation";

const JoinPage: React.FC = () => {
  const tryJoinGame = async (formData: FormData) => {
    "use server";
    const res = await joinGame(formData);
    if (res.errors) {
      console.error(res);
    }
    if (res.message) {
      redirect(`/play/${res.message}`);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Join Game
        </h2>
        <form
          action={tryJoinGame}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="playerId"
            >
              Game ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="gameId"
              name="gameId"
              type="text"
              placeholder="Enter Game ID"
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="playerId"
            >
              Player ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="playerId"
              name="playerId"
              type="text"
              placeholder="Enter Player ID"
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <CustomButton className="w-full">{"> "} Join Game</CustomButton>
            <LinkButton href="/" className="btn-sm">
              Back to Home
            </LinkButton>
          </div>
        </form>
      </div>
    </main>
  );
};
export default JoinPage;
