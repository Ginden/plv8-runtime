FROM postgres:11

MAINTAINER ginden (michalwadas@gmail.com)

ENV PLV8_VERSION=2.3.15

RUN mkdir /build
WORKDIR /build



RUN apt-get -y -qq update

RUN apt-get -y -qq install postgresql-server-dev-11 gcc make g++ pkg-config libc++-dev wget git python python3 > /dev/null

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

RUN apt-get -yq remove postgresql-server-dev-11 gcc make g++ pkg-config libc++-dev wget git

RUN rm -rf /build

RUN apt-get autoremove -y
