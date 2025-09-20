import AddCabin from "../features/cabins/AddCabin";
import CabinsTables from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row>
        <CabinsTables />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
