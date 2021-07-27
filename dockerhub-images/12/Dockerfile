FROM postgres:12 AS builder

MAINTAINER ginden (michalwadas@gmail.com)

ENV PLV8_VERSION=3.0.0

RUN mkdir /build
WORKDIR /build



RUN apt-get -y -qq update

RUN apt-get -y -qq install postgresql-server-dev-12 gcc make g++ pkg-config libc++-dev wget git libncurses5 python python3  libc++abi-dev  > /dev/null

RUN wget -q https://github.com/plv8/plv8/archive/v${PLV8_VERSION}.tar.gz -O plv8.tar.gz

RUN tar -xvzf plv8.tar.gz

RUN git config --global user.email "you@example.com"
RUN git config --global user.name "Your Name"

# RUN git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git

# ENV PATH="/build/depot_tools:${PATH}"

# RUN gclient config

# RUN gclient sync

ENV GYP_CHROMIUM_NO_ACTION=0

WORKDIR /build/plv8-${PLV8_VERSION}

RUN make USE_PGXS=1

RUN make USE_PGXS=1 install

RUN apt-get -yq remove postgresql-server-dev-12 gcc make g++ pkg-config libc++-dev wget git libncurses5 python python3  libc++abi-dev

RUN apt-get autoremove -y

RUN find /build/

FROM postgres:12
ENV PLV8_VERSION=3.0.0

COPY --from=builder build/plv8-${PLV8_VERSION}/plv8.control build/plv8-${PLV8_VERSION}/plv8--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--1.5.1--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--2.3.7--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--1.5.2--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--2.3.5--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--2.3.2--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--1.5.5--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--2.3.0--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--2.0.3--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--1.5.0--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--2.3.8--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--2.1.0--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--2.3.10--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--2.0.1--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--2.3.6--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--1.5.7--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--2.1.2--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--1.5.6--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--2.3.3--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--2.3.9--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--2.0.0--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--1.5.3--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--2.3.4--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--2.3.1--3.0.0.sql build/plv8-${PLV8_VERSION}/upgrade/plv8--1.5.4--3.0.0.sql build/plv8-${PLV8_VERSION}/plcoffee.control build/plv8-${PLV8_VERSION}/plcoffee--3.0.0.sql build/plv8-${PLV8_VERSION}/plls.control build/plv8-${PLV8_VERSION}/plls--3.0.0.sql /usr/share/postgresql/12/extension/
