import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RectButton, TextInput } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";
import styles from "./styles";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

interface IBGEUF {
  sigla: string;
}

interface IBGECity {
  nome: string;
}

const Home = () => {
  const navigation = useNavigation();

  const [ufs, setUFs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");

  function handleNavigationToPoint() {
    navigation.navigate("Points", { selectedUf, selectedCity });
  }

  const placeholderUf = {
    label: "Selecione o Estado",
    value: null,
  };

  const placeholderCity = {
    label: "Selecione a Cidade",
    value: null,
  };

  useEffect(() => {
    axios
      .get<IBGEUF[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);

        setUFs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }
    axios
      .get<IBGECity[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ImageBackground
        source={require("../../assets/home-background.png")}
        resizeMode="contain"
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require("../../assets/logo.png")} />
          <View>
            <Text style={styles.title}>
              Seu marketplace de coleta de resíduos
            </Text>
            <Text style={styles.description}>
              Ajudamos pessoas a encontrar pontos de coleta de forma eficiente.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            style={{
              inputAndroid: {
                backgroundColor: "#fff",
                marginBottom: 10,
                fontSize: 16,
                paddingHorizontal: 10,
                paddingVertical: 12,
                borderRadius: 8,
                paddingRight: 30,
              },
            }}
            placeholder={placeholderUf}
            items={ufs.map((uf) => {
              return {
                label: uf,
                value: uf,
                key: uf,
              };
            })}
            onValueChange={(value) => {
              setSelectedUf(value);
            }}
          />
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            style={{
              inputAndroid: {
                backgroundColor: "#fff",
                marginBottom: 16,
                fontSize: 16,
                paddingHorizontal: 10,
                paddingVertical: 12,
                borderRadius: 8,
                paddingRight: 30,
              },
            }}
            placeholder={placeholderCity}
            items={cities.map((city) => {
              return {
                label: city,
                value: city,
                key: city,
              };
            })}
            onValueChange={(value) => {
              setSelectedCity(value);
            }}
          />
          <RectButton style={styles.button} onPress={handleNavigationToPoint}>
            <View style={styles.buttonIcon}>
              <Icon name="arrow-right" color="#FFF" size={24} />
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Home;
