import Label from "@/components/common/Label";
import Form from "@/components/common/Form";
import LinkButton from "@/components/common/LinkButton";
import CustomButton from "@/components/common/CustomButton";
import { joinGame } from "@/actions/game-actions";
import TextInput from "@/components/common/TextInput";

const JoinPage: React.FC = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Join Game
        </h2>
        <Form formAction={joinGame}>
          <div className="mb-6">
            <Label htmlFor="gameId">Game ID</Label>
            <TextInput id="gameId" name="gameId" placeholder="Enter Game ID" />
            <Label htmlFor="playerId">Player ID</Label>
            <TextInput
              id="playerId"
              name="playerId"
              placeholder="Enter Player ID"
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <CustomButton className="w-full">{"> "} Join Game</CustomButton>
            <LinkButton href="/" className="btn-sm">
              Back to Home
            </LinkButton>
          </div>
        </Form>
      </div>
    </main>
  );
};
export default JoinPage;
