import LinkButton from "@/components/common/LinkButton";
import CustomButton from "@/components/common/CustomButton";
import { createGame } from "@/actions/game-actions";
import { redirect } from "next/navigation";


const CreatePage: React.FC = () => {
  const tryCreateGame = async (formData: FormData) => {
    "use server";
    const res = await createGame(formData);
    if (res.errors) {
      alert(res.errors);
    }
    if (res.gameId) {
      redirect(`/play/${res.gameId}`);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create Game
        </h2>
        <form
          action={tryCreateGame}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-6">
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
            <CustomButton className="w-full">{"> "} Create Game</CustomButton>
            <LinkButton href="/" className="btn-sm">
              Back to Home
            </LinkButton>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreatePage;
