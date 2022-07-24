import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide, Zoom } from "react-awesome-reveal";
import { ContactProps, ValidationTypeProps } from "./types";
import { useForm } from "../../common/utils/useForm";
import validate from "../../common/utils/validationRules";
import { Button } from "../../common/Button";
import Block from "../Block";
import Input from "../../common/Input";
import TextArea from "../../common/TextArea";
import { ContactContainer, FormGroup, Span, ButtonContainer } from "./styles";
import FileUploadApi  from "../../api/FileUploadApi"
import { useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Contact = ({ title, content, id, t, isRefund }: ContactProps) => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    validate
  ) as any;

  const [File, setFile] = useState("")
  const [Name, setName] = useState("")
  const [Telegram, setTelegram] = useState("")  
  const [Message, setMessage] = useState("")
  const [IsLoading, setIsLoading] = useState(false)
  
  const ValidationType = ({ type }: ValidationTypeProps) => {
    const ErrorMessage = errors[type];
    return (
      <Zoom direction="left">
        <Span erros={errors[type]}>{ErrorMessage}</Span>
      </Zoom>
    );
  };

  const handleInputChange = (event: any) => {
    console.log("handleInputChange!!!")
    const target = event.target;
    const value = target.type === 'file' ? event.target.files[0] : target.value;
    const name = target.name;
    setFile(value)
    // this.setState({
    //     [name]: value, error: ""
    // });
};

  const onClick = async () => {
    try {
        setIsLoading(true)
        FileUploadApi.uploadFile(File, Name, Telegram, Message, isRefund)
                  .finally(() => { 
                    setIsLoading(false);
                    toast.success(isRefund ? "Заявка принята" : "Заказ принят")
                  })
        //if (!result)
        // this.displayTheError('No user found');
    } catch (e) {
        //await this.toggleErrorAsync(e.message);
        return;
    }
    //await this.fetchMetadata(0, pageSize);
}

  return (
    <ContactContainer id={id}>
      <Row justify="space-between" align="middle">
        <Col lg={12} md={11} sm={24} xs={24}>
          <Slide direction="left">
            <Block title={title} content={content} />
          </Slide>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Slide direction="right">
            <FormGroup autoComplete="off" onSubmit={handleSubmit}>
              <Col span={24}>
                <Input
                  type="text"
                  name="имя"
                  placeholder="Ваше имя"
                  value={values.name || ""}
                  onChange={(e) => {
                    handleChange(e)
                    setName(e.target.value)
                  }}
                />
                <ValidationType type="name" />
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="телеграм"
                  placeholder="Ваш телеграм"
                  value={values.email || ""}
                  onChange={(e) => {
                    handleChange(e)
                    setTelegram(e.target.value)
                  }}
                />
                <ValidationType type="email" />
              </Col>
              <Col span={24}>
                <TextArea
                  placeholder={isRefund ? "Причина возврата" : "Ваше задание" }
                  value={values.message || ""}
                  name={isRefund ? "причина" : "задание"}
                  onChange={(e) => {
                    handleChange(e)
                    setMessage(e.target.value)
                  }}
                />
                <ValidationType type="message" />
              </Col>
              <Col>
              <Input
                  type="file"
                  name={ isRefund ?
                    "можете прикрепить фото с доказательством, но это не обязательно" 
                    :
                    "можете прикрепить файл с заданием"
                  }
                  placeholder=""
                  onChange={handleInputChange}
                />
              </Col>
              <ButtonContainer>
                <LoadingButton 
                name="submit" 
                loading={IsLoading}
                variant="contained"
                onClick={onClick}>{isRefund ? ("Вернуть деньги") : ("Оформить заказ")}</LoadingButton>
              </ButtonContainer>
            </FormGroup>
          </Slide>
        </Col>
      </Row>
      <ToastContainer />
    </ContactContainer>
  );
};

export default withTranslation()(Contact);
