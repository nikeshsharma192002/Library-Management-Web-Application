import { Box } from "@mui/material";

import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAddMemberMutation } from "state/api";
import MemberForm from "components/MemberForm";

const AddMember = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  //form
  const [addMember] = useAddMemberMutation();

  //submit
  const navigate = useNavigate();
  const handleFormSubmit = async (values) => {
    console.log(values);
    await addMember(values);
    alert("Member Added Successfully");
    navigate("/members");
  };

  // console.log(member);
  // console.log(member?.name);

  // if (!member) return "Loading...";

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween sx={{ m: "2vh 0" }}>
        <Header title="ADD MEMBER" subtitle="Create a new user" />
      </FlexBetween>
      <MemberForm
        isNonMobile={isNonMobile}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default AddMember;
