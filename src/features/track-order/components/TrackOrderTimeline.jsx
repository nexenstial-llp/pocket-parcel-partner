/* eslint-disable react/prop-types */
import { removeUnderscores } from "@/utils/typography.util";
import { Timeline, Typography } from "antd";
import moment from "moment-timezone";
import { EnvironmentOutlined } from "@ant-design/icons";

const { Text } = Typography;

const TrackOrderTimeline = ({ scans, getClickpostStatusConfig }) => {
  return (
    <Timeline
      reverse
      mode="left"
      items={scans.map((scan) => {
        const conf = getClickpostStatusConfig(scan.clickpost_status_code);
        return {
          color: conf.color,
          dot: (
            <div className={`text-${conf.color}-500 text-lg`}>{conf.icon}</div>
          ),
          children: (
            <div className="mb-4 last:mb-0 bg-orange-50 hover:shadow-sm p-3 rounded-md">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                <div>
                  <Text strong className="text-sm block text-gray-800">
                    {scan.status}
                  </Text>
                  {scan.remark && scan.remark !== scan.status && (
                    <Text
                      type="secondary"
                      className="text-xs block mt-0.5 line-clamp-1"
                    >
                      {scan.remark}
                    </Text>
                  )}
                </div>
                <div className="flex gap-1">
                  <div className="text-right shrink-0">
                    <Text className="text-xs text-gray-500 font-medium whitespace-nowrap block">
                      {moment(scan.timestamp).format("DD MMM YY, HH:mm")},
                    </Text>
                  </div>
                  <div className="text-right shrink-0">
                    <Text className="text-[11px]! text-gray-200 whitespace-nowrap">
                      {moment(scan.timestamp).fromNow()}
                    </Text>
                  </div>
                </div>
              </div>
              {scan.location && (
                <div className="mt-1 flex items-center gap-1">
                  <EnvironmentOutlined className="text-gray-400 text-xs" />
                  <Text type="secondary" className="text-xs">
                    {removeUnderscores(scan.location)}
                  </Text>
                </div>
              )}
            </div>
          ),
        };
      })}
    />
  );
};

export default TrackOrderTimeline;
