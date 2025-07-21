
import { model, Schema } from "mongoose";

const remarkSchema = new Schema({
  enquiryId: {
    type: Schema.Types.ObjectId,
    ref: "EnquiryList",
    // required: true,
  },
  remarkText: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Not Contacted", // Default value if no status is provided
  },
  nextFollowUpDateTime: {
    type: Date,
  },
  leadStage: {
    type: String,
  },
  leadStatus: {
    type: String,
  },
  leadType: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  history: [  // Corrected typo here
    {
      nextFollowUpDateTime: {
        type: Date
      },
      remarkText: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      changeDate: {
        type: Date
      }
    }
  ]
}, {
  timestamps: true
});

const Remark = model("Remark", remarkSchema);

export default Remark;
