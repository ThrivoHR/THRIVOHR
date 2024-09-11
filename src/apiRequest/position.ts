import http from "@/lib/https";
import { PositionListResType } from "@/schemaValidation/position.schema";

const apiPositionRequest = {
  getPosition: async () => {
    const response = await http.get<PositionListResType>("/api/v1/position");
    return response;  // Ensure the correct response data is returned
  },
};

export default apiPositionRequest;
