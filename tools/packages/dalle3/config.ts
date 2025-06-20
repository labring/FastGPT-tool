import {
  defineTool,
  FlowNodeInputTypeEnum,
  FlowNodeOutputTypeEnum,
  WorkflowIOValueTypeEnum,
} from "@/type";

export default defineTool({
  toolId: "commercial-dalle3",
  isActive: false,
  versionList: [
    {
      version: "1.0.0",
      description: "初始版本",
    },
  ],
  type: "multimodal",
  name: {
    "zh-CN": "Dalle3 绘图",
    en: "Dalle3 Drawing",
  },
  description: {
    "zh-CN": "调用 Dalle3 接口绘图",
    en: "Call Dalle3 Interface to Draw",
  },
  icon: "common/openai",
  inputs: [
    {
      key: "system_input_config",
      label: "",
      inputList: [
        {
          key: "url",
          label: "Dalle3 接口基础地址",
          description: "例如：https://api.openai.com",
          inputType: "string",
          required: true,
        },
        {
          key: "authorization",
          label: "接口凭证（不需要 Bearer）",
          description: "sk-xxxx",
          required: true,
          inputType: "secret",
        },
      ],
      renderTypeList: [FlowNodeInputTypeEnum.hidden],
      valueType: "object",
      defaultValue: {
        type: "system",
      },
    },
    {
      key: "绘图提示词",
      label: "绘图提示词",
      renderTypeList: [
        FlowNodeInputTypeEnum.input,
        FlowNodeInputTypeEnum.reference,
      ],
    },
  ],
  outputs: [
    {
      id: "link",
      type: FlowNodeOutputTypeEnum.static,
      valueType: WorkflowIOValueTypeEnum.string,
      key: "图片访问链接",
      label: "图片访问链接",
      description: "图片访问链接",
    },
    {
      id: "error",
      type: FlowNodeOutputTypeEnum.static,
      valueType: WorkflowIOValueTypeEnum.string,
      key: "错误信息",
      label: "错误信息",
      description: "错误信息",
    },
  ],
});
