import { CustomCard } from "../../../Components/CustomCard";
import { TopTitle } from "../../../Components/Form/TopTitle";
import { PurchaseEntryPage } from "./PendingEntryEstimate/PurchaseEntryPage";


export const PendingEntryEstimate = ({setSaleorder,getPurch}) => {
  return (
    <div>
      <TopTitle Heading={'Estimate Purchase'}/>
      <CustomCard>
      <PurchaseEntryPage getPurch={getPurch} setSaleorder={setSaleorder}/>
      </CustomCard>
  
    </div>
  )
}
