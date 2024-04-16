import Form from "@/components/common/Form";
import Label from "@/components/common/Label";
import TextInput from "@/components/common/TextInput";
import { createGame } from "@/actions/game-actions";
import CustomButton from "@/components/common/CustomButton";
import LinkButton from "@/components/common/LinkButton";
import { redirect } from "next/navigation";

const CreatePage: React.FC = () => {
  const createGameWrapper = async (preFormData: any, formData: FormData) => {
    "use server";
    const response = await createGame(preFormData, formData);

    if (response.error) {
      return {error: response.error};
    }

    if (response.data) {
      console.log("response.data: ", response.data);
      redirect(
        `/game/play/${response.data.gameId}?playerId=${response.data.hostId}`
      );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create Game
        </h2>
        <Form formAction={createGameWrapper}>
          <div className="mb-6">
            <Label htmlFor="hostId">Player ID</Label>
            <TextInput
              id="hostId"
              name="hostId"
              placeholder="Enter Player ID"
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <CustomButton className="w-full">{"> "} Create Game</CustomButton>
            <LinkButton href="/" className="btn-sm">
              Back to Home
            </LinkButton>
          </div>
        </Form>
      </div>
    </main>
  );
};

export default CreatePage;
