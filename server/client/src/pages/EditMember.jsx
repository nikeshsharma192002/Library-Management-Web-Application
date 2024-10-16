import { Box } from "@mui/material";

import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import { useParams, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useGetMemberQuery, useEditMemberMutation } from "state/api";
import MemberForm from "components/MemberForm";

const EditMember = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  let { id } = useParams();
  const { data: member } = useGetMemberQuery(id);
  //form
  const [editMembers] = useEditMemberMutation();

  //submit
  const navigate = useNavigate();
  const handleFormSubmit = async (Member) => {
    console.log(Member);
    await editMembers({ Member, id });
    alert("Details Updated Successfully\nChanges Takes Sometime to Reflect");
    navigate("/members");
  };

  // console.log(member);
  // console.log(member?.name);

  if (!member) return "Loading...";

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween sx={{ m: "2vh 0" }}>
        <Header title="EDIT MEMBER" subtitle="Edit Members Details" />
      </FlexBetween>
      <MemberForm
        member={member}
        isNonMobile={isNonMobile}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default EditMember;
