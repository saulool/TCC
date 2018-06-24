--
-- PostgreSQL database dump
--

-- Dumped from database version 10.1
-- Dumped by pg_dump version 10.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: indices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE indices (
    nome text NOT NULL,
    id_indice integer NOT NULL,
    media double precision NOT NULL
);


ALTER TABLE indices OWNER TO postgres;

--
-- Name: indices_valores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE indices_valores (
    id_valor integer NOT NULL,
    id_indice integer NOT NULL,
    ano integer NOT NULL,
    valor double precision NOT NULL
);


ALTER TABLE indices_valores OWNER TO postgres;

--
-- Name: investimento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE investimento (
    id_investimento integer NOT NULL,
    nome_instituicao text NOT NULL,
    nome text NOT NULL,
    taxa double precision NOT NULL,
    vencimento date NOT NULL,
    id_indice integer
);


ALTER TABLE investimento OWNER TO postgres;

--
-- Name: lancamento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE lancamento_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE lancamento_id_seq OWNER TO postgres;

--
-- Name: lancamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE lancamentos (
    id_lancamento integer DEFAULT nextval('lancamento_id_seq'::regclass) NOT NULL,
    id_usuario integer NOT NULL,
    descricao text NOT NULL,
    tipo text NOT NULL,
    natureza text NOT NULL,
    valor double precision NOT NULL,
    cnpj text,
    nome_cnpj text,
    data timestamp(4) without time zone NOT NULL
);


ALTER TABLE lancamentos OWNER TO postgres;

--
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE usuario_id_seq OWNER TO postgres;

--
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE usuario (
    id_usuario integer DEFAULT nextval('usuario_id_seq'::regclass) NOT NULL,
    nome text NOT NULL,
    sobrenome text NOT NULL,
    email text NOT NULL,
    senha text NOT NULL,
    novo_usuario boolean,
    banco_conectado boolean,
    agencia integer,
    conta integer
);


ALTER TABLE usuario OWNER TO postgres;

--
-- Name: usuario_id_usuario; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE usuario_id_usuario
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE usuario_id_usuario OWNER TO postgres;

--
-- Data for Name: indices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY indices (nome, id_indice, media) FROM stdin;
IPCA	1	6.09999999999999964
SELIC	2	10.8699999999999992
CDI	3	10.3599999999999994
IGPM	4	6.34999999999999964
SIMPLES	5	0
\.


--
-- Data for Name: indices_valores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY indices_valores (id_valor, id_indice, ano, valor) FROM stdin;
1	1	2012	5.83999999999999986
2	1	2013	5.91000000000000014
3	1	2014	6.41000000000000014
4	1	2015	10.6699999999999999
5	1	2016	6.29000000000000004
6	1	2017	2.95000000000000018
7	2	2012	7.25
8	2	2013	10
9	2	2014	11.75
10	2	2015	14.25
11	2	2016	13.75
12	2	2017	7
13	3	2012	8.40000000000000036
14	3	2013	8.0600000000000005
15	3	2014	10.8100000000000005
16	3	2015	13.2400000000000002
17	3	2016	14
18	3	2017	9.92999999999999972
19	4	2012	7.80999999999999961
20	4	2013	5.51999999999999957
21	4	2014	3.66999999999999993
22	4	2015	10.5399999999999991
23	4	2016	7.17999999999999972
24	4	2017	-0.530000000000000027
\.


--
-- Data for Name: investimento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY investimento (id_investimento, nome_instituicao, nome, taxa, vencimento, id_indice) FROM stdin;
1	Governo Brasileiro	Tesouro IPCA+ 2024	4.46999999999999975	2024-06-12	1
4	Banco BMG	CDB BMG	123	2021-02-01	3
2	Governo Brasileiro	Tesouro Selic 2023	0.0100000000000000002	2023-03-15	2
3	Governo Brasileiro	Tesouro Prefixado 2021	7.95000000000000018	2021-01-03	5
5	Banco Fibra	CDB Fibra	4.90000000000000036	2021-04-12	4
\.


--
-- Data for Name: lancamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY lancamentos (id_lancamento, id_usuario, descricao, tipo, natureza, valor, cnpj, nome_cnpj, data) FROM stdin;
1187	44	eeoiwjrower	D	LAZER	38.3299999999999983	\N	\N	2018-05-30 17:15:00
1188	44	Salario	R	SALARIO	3410.34000000000015	\N	\N	2018-06-03 00:00:00
1189	44	Mercado	D	ALIMENTACAO	731.690000000000055	\N	\N	2018-06-04 00:00:00
1190	44	Mercado	D	EDUCACAO	329.110000000000014	\N	\N	2018-06-04 00:00:00
1191	44	Mercado	D	LOCOMOCAO	155.330000000000013	\N	\N	2018-06-04 00:00:00
1198	44	Dentista	D	SAUDE	350	53856945000176	Fábio Eduardo	2017-06-10 17:23:00
1195	44	skdjhfs	D	SAUDE	33.3299999999999983	\N	\N	2018-06-06 17:21:00
1196	44	4123432	D	MORADIA	44.4399999999999977	\N	\N	2018-06-06 17:21:00
1199	44	Presente	D	LAZER	1500	\N	\N	2018-06-11 12:50:00
1087	44	Salario	R	SALARIO	3410.34000000000015	\N	\N	2017-09-03 00:00:00
1088	44	Mercado	D	ALIMENTACAO	149.800000000000011	\N	\N	2017-09-04 00:00:00
1089	44	Passeio	D	LAZER	455.769999999999982	\N	\N	2017-09-07 00:00:00
1090	44	Conta de telefone e internet	D	CONTAS	244.169999999999987	\N	\N	2017-09-10 00:00:00
1091	44	Conta de luz	D	CONTAS	629.32000000000005	\N	\N	2017-09-10 00:00:00
1092	44	Consulta médica	D	SAUDE	549.169999999999959	\N	\N	2017-09-12 00:00:00
1093	44	Faculdade	D	EDUCACAO	695.809999999999945	\N	\N	2017-09-15 00:00:00
1094	44	Condomínio	D	CONTAS	49.3599999999999994	\N	\N	2017-09-15 00:00:00
1095	44	Recebimento de aluguel	R	ALUGUEL	1330	\N	\N	2017-09-15 00:00:00
1096	44	Combustível	D	LOCOMOCAO	859.409999999999968	\N	\N	2017-09-20 00:00:00
1097	44	Presente	D	OUTROS	730.17999999999995	\N	\N	2017-09-23 00:00:00
1098	44	Mercado	D	ALIMENTACAO	923.75	\N	\N	2017-09-26 00:00:00
1099	44	Salario	R	SALARIO	3410.34000000000015	\N	\N	2017-10-03 00:00:00
1100	44	Mercado	D	ALIMENTACAO	387.449999999999989	\N	\N	2017-10-04 00:00:00
1101	44	Passeio	D	LAZER	257	\N	\N	2017-10-07 00:00:00
1102	44	Conta de telefone e internet	D	CONTAS	540.769999999999982	\N	\N	2017-10-10 00:00:00
1103	44	Conta de luz	D	CONTAS	224.090000000000003	\N	\N	2017-10-10 00:00:00
1104	44	Consulta médica	D	SAUDE	764.620000000000005	\N	\N	2017-10-12 00:00:00
1105	44	Faculdade	D	EDUCACAO	543.039999999999964	\N	\N	2017-10-15 01:00:00
1106	44	Condomínio	D	CONTAS	752.159999999999968	\N	\N	2017-10-15 01:00:00
1107	44	Recebimento de aluguel	R	ALUGUEL	1330	\N	\N	2017-10-15 01:00:00
1108	44	Combustível	D	LOCOMOCAO	556.860000000000014	\N	\N	2017-10-20 00:00:00
1109	44	Presente	D	OUTROS	267.639999999999986	\N	\N	2017-10-23 00:00:00
1110	44	Mercado	D	ALIMENTACAO	0.939999999999999947	\N	\N	2017-10-26 00:00:00
1111	44	Salario	R	SALARIO	3410.34000000000015	\N	\N	2017-11-03 00:00:00
1112	44	Mercado	D	ALIMENTACAO	220.72999999999999	\N	\N	2017-11-04 00:00:00
1113	44	Passeio	D	LAZER	183.72999999999999	\N	\N	2017-11-07 00:00:00
1114	44	Conta de telefone e internet	D	CONTAS	586.399999999999977	\N	\N	2017-11-10 00:00:00
1115	44	Conta de luz	D	CONTAS	765.309999999999945	\N	\N	2017-11-10 00:00:00
1116	44	Consulta médica	D	SAUDE	952.789999999999964	\N	\N	2017-11-12 00:00:00
1117	44	Faculdade	D	EDUCACAO	840.919999999999959	\N	\N	2017-11-15 00:00:00
1118	44	Condomínio	D	CONTAS	818.860000000000014	\N	\N	2017-11-15 00:00:00
1119	44	Recebimento de aluguel	R	ALUGUEL	1330	\N	\N	2017-11-15 00:00:00
1120	44	Combustível	D	LOCOMOCAO	430.920000000000016	\N	\N	2017-11-20 00:00:00
1121	44	Presente	D	OUTROS	847.590000000000032	\N	\N	2017-11-23 00:00:00
1122	44	Mercado	D	ALIMENTACAO	116.049999999999997	\N	\N	2017-11-26 00:00:00
1123	44	Salario	R	SALARIO	3410.34000000000015	\N	\N	2017-12-03 00:00:00
1124	44	Mercado	D	ALIMENTACAO	299.870000000000005	\N	\N	2017-12-04 00:00:00
1125	44	Passeio	D	LAZER	397.350000000000023	\N	\N	2017-12-07 00:00:00
1126	44	Conta de telefone e internet	D	CONTAS	444.980000000000018	\N	\N	2017-12-10 00:00:00
1127	44	Conta de luz	D	CONTAS	202.740000000000009	\N	\N	2017-12-10 00:00:00
1128	44	Consulta médica	D	SAUDE	822.169999999999959	\N	\N	2017-12-12 00:00:00
1129	44	Faculdade	D	EDUCACAO	549.519999999999982	\N	\N	2017-12-15 00:00:00
1130	44	Condomínio	D	CONTAS	365.730000000000018	\N	\N	2017-12-15 00:00:00
1131	44	Recebimento de aluguel	R	ALUGUEL	1330	\N	\N	2017-12-15 00:00:00
1132	44	Combustível	D	LOCOMOCAO	581.090000000000032	\N	\N	2017-12-20 00:00:00
1133	44	Presente	D	OUTROS	99.1700000000000017	\N	\N	2017-12-23 00:00:00
1134	44	Mercado	D	ALIMENTACAO	496.420000000000016	\N	\N	2017-12-26 00:00:00
1135	44	Salario	R	SALARIO	3410.34000000000015	\N	\N	2018-01-03 00:00:00
1136	44	Mercado	D	ALIMENTACAO	660.610000000000014	\N	\N	2018-01-04 00:00:00
1137	44	Passeio	D	LAZER	801.110000000000014	\N	\N	2018-01-07 00:00:00
1138	44	Conta de telefone e internet	D	CONTAS	476.839999999999975	\N	\N	2018-01-10 00:00:00
1139	44	Conta de luz	D	CONTAS	392.269999999999982	\N	\N	2018-01-10 00:00:00
1140	44	Consulta médica	D	SAUDE	338.060000000000002	\N	\N	2018-01-12 00:00:00
1141	44	Faculdade	D	EDUCACAO	742.259999999999991	\N	\N	2018-01-15 00:00:00
1142	44	Condomínio	D	CONTAS	809.659999999999968	\N	\N	2018-01-15 00:00:00
1143	44	Recebimento de aluguel	R	ALUGUEL	1330	\N	\N	2018-01-15 00:00:00
1144	44	Combustível	D	LOCOMOCAO	319.699999999999989	\N	\N	2018-01-20 00:00:00
1145	44	Presente	D	OUTROS	543.299999999999955	\N	\N	2018-01-23 00:00:00
1146	44	Mercado	D	ALIMENTACAO	975.909999999999968	\N	\N	2018-01-26 00:00:00
1147	44	Salario	R	SALARIO	3410.34000000000015	\N	\N	2018-02-03 00:00:00
1148	44	Mercado	D	ALIMENTACAO	253.740000000000009	\N	\N	2018-02-04 00:00:00
1149	44	Passeio	D	LAZER	702.220000000000027	\N	\N	2018-02-07 00:00:00
1150	44	Conta de telefone e internet	D	CONTAS	2.16780000000000017	\N	\N	2018-02-10 00:00:00
1151	44	Conta de luz	D	CONTAS	236.150000000000006	\N	\N	2018-02-10 00:00:00
1152	44	Consulta médica	D	SAUDE	677.129999999999995	\N	\N	2018-02-12 00:00:00
1153	44	Faculdade	D	EDUCACAO	111.560000000000002	\N	\N	2018-02-15 00:00:00
1154	44	Condomínio	D	CONTAS	375.550000000000011	\N	\N	2018-02-15 00:00:00
1155	44	Recebimento de aluguel	R	ALUGUEL	1330	\N	\N	2018-02-15 00:00:00
1156	44	Combustível	D	LOCOMOCAO	707.600000000000023	\N	\N	2018-02-20 00:00:00
1157	44	Presente	D	OUTROS	28.9879999999999995	\N	\N	2018-02-23 00:00:00
1158	44	Mercado	D	ALIMENTACAO	212.72999999999999	\N	\N	2018-02-26 00:00:00
1159	44	Salario	R	SALARIO	3410.34000000000015	\N	\N	2018-03-03 00:00:00
1160	44	Mercado	D	ALIMENTACAO	722.529999999999973	\N	\N	2018-03-04 00:00:00
1161	44	Passeio	D	LAZER	324.829999999999984	\N	\N	2018-03-07 00:00:00
1162	44	Conta de telefone e internet	D	CONTAS	112.060000000000002	\N	\N	2018-03-10 00:00:00
1163	44	Conta de luz	D	CONTAS	920.419999999999959	\N	\N	2018-03-10 00:00:00
1164	44	Consulta médica	D	SAUDE	477.220000000000027	\N	\N	2018-03-12 00:00:00
1165	44	Faculdade	D	EDUCACAO	436.259999999999991	\N	\N	2018-03-15 00:00:00
1166	44	Condomínio	D	CONTAS	569.809999999999945	\N	\N	2018-03-15 00:00:00
1167	44	Recebimento de aluguel	R	ALUGUEL	1330	\N	\N	2018-03-15 00:00:00
1168	44	Combustível	D	LOCOMOCAO	632.779999999999973	\N	\N	2018-03-20 00:00:00
1169	44	Presente	D	OUTROS	109.349999999999994	\N	\N	2018-03-23 00:00:00
1170	44	Mercado	D	ALIMENTACAO	58.25	\N	\N	2018-03-26 00:00:00
1171	44	Salario	R	SALARIO	3410.34000000000015	\N	\N	2018-04-03 00:00:00
1172	44	Mercado	D	ALIMENTACAO	731.690000000000055	\N	\N	2018-04-04 00:00:00
1173	44	Passeio	D	LAZER	709	\N	\N	2018-04-07 00:00:00
1174	44	Conta de telefone e internet	D	CONTAS	213.069999999999993	\N	\N	2018-04-10 00:00:00
1175	44	Conta de luz	D	CONTAS	263.79000000000002	\N	\N	2018-04-10 00:00:00
1176	44	Consulta médica	D	SAUDE	460.860000000000014	\N	\N	2018-04-12 00:00:00
1177	44	Faculdade	D	EDUCACAO	998.970000000000027	\N	\N	2018-04-15 00:00:00
1178	44	Condomínio	D	CONTAS	959.57000000000005	\N	\N	2018-04-15 00:00:00
1179	44	Recebimento de aluguel	R	ALUGUEL	970.309999999999945	\N	\N	2018-04-15 00:00:00
1180	44	Combustível	D	LOCOMOCAO	311.629999999999995	\N	\N	2018-04-20 00:00:00
1181	44	Presente	D	OUTROS	291.889999999999986	\N	\N	2018-04-23 00:00:00
1182	44	Mercado	D	ALIMENTACAO	981.42999999999995	\N	\N	2018-04-26 00:00:00
1183	44	Salario	R	SALARIO	3410.34000000000015	\N	\N	2018-05-03 00:00:00
1184	44	Mercado	D	ALIMENTACAO	731.690000000000055	\N	\N	2018-05-04 00:00:00
1185	44	Mercado	D	EDUCACAO	329.110000000000014	\N	\N	2018-05-04 00:00:00
1186	44	Mercado	D	LOCOMOCAO	155.330000000000013	\N	\N	2018-05-04 00:00:00
1197	44	Dentista	D	SAUDE	350	53856945000176	Fábio Eduardo	2018-06-12 17:22:00
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY usuario (id_usuario, nome, sobrenome, email, senha, novo_usuario, banco_conectado, agencia, conta) FROM stdin;
44	teste	teste	teste@teste.com	teste	t	f	\N	\N
\.


--
-- Name: lancamento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('lancamento_id_seq', 1199, true);


--
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('usuario_id_seq', 44, true);


--
-- Name: usuario_id_usuario; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('usuario_id_usuario', 1, false);


--
-- Name: indices indices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY indices
    ADD CONSTRAINT indices_pkey PRIMARY KEY (id_indice);


--
-- Name: indices_valores indices_valores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY indices_valores
    ADD CONSTRAINT indices_valores_pkey PRIMARY KEY (id_valor);


--
-- Name: investimento investimento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY investimento
    ADD CONSTRAINT investimento_pkey PRIMARY KEY (id_investimento);


--
-- Name: lancamentos lancamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY lancamentos
    ADD CONSTRAINT lancamentos_pkey PRIMARY KEY (id_lancamento);


--
-- Name: usuario uniq_email_usuario; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY usuario
    ADD CONSTRAINT uniq_email_usuario UNIQUE (email);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);


--
-- Name: indices_valores id_indice_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY indices_valores
    ADD CONSTRAINT id_indice_fk FOREIGN KEY (id_indice) REFERENCES indices(id_indice);


--
-- Name: lancamentos id_usuarioFK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY lancamentos
    ADD CONSTRAINT "id_usuarioFK" FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario);


--
-- Name: investimento investimento_id_indice_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY investimento
    ADD CONSTRAINT investimento_id_indice_fkey FOREIGN KEY (id_indice) REFERENCES indices(id_indice);


--
-- PostgreSQL database dump complete
--

