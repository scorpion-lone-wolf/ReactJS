import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function filterCabinsData(cabins = [], filterWith = "all") {
  if (filterWith === "all") return cabins;

  if (filterWith === "with-discount") {
    return cabins.filter(cabin => cabin.discount > 0);
  }

  if (filterWith === "no-discount") {
    return cabins.filter(cabin => cabin.discount === 0);
  }

  return cabins;
}
export default function CabinsTables() {
  const [searchParams] = useSearchParams();
  const discount = searchParams.get("discount");
  const { cabins, isLoading } = useCabins();
  const filteredCabins = filterCabinsData(cabins, discount);

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
