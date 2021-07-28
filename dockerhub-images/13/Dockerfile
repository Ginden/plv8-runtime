FROM postgres:13 AS builder

MAINTAINER ginden (michalwadas@gmail.com)

ENV PLV8_VERSION=3.0.0

RUN mkdir /build
WORKDIR /build



RUN apt-get -y -qq update

RUN apt-get -y -qq install postgresql-server-dev-13 gcc make g++ pkg-config libc++-dev wget git libncurses5 python python3  libc++abi-dev  > /dev/null

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

RUN apt-get -yq remove postgresql-server-dev-13 gcc make g++ pkg-config libc++-dev wget git libncurses5 python python3  libc++abi-dev

RUN apt-get autoremove -y

RUN apt-get install grep

RUN rm -rf /build/plv8-${PLV8_VERSION}/build

WORKDIR /build

RUN tar --list --file=/build/plv8.tar.gz | grep -v '/$' | xargs -n1 rm

RUN find .

FROM postgres:13
ENV PLV8_VERSION=3.0.0

RUN apt-get update
RUN apt-get install -y llvm libc++-dev
COPY --from=builder build/plv8-${PLV8_VERSION}/ /build

RUN env

WORKDIR /build


RUN mkdir -p "/usr/lib/postgresql/${PG_MAJOR}/lib" && \
mkdir -p "/usr/share/postgresql/${PG_MAJOR}/extension" && \
/usr/bin/install -c -m 755  plv8-${PLV8_VERSION}.so "/usr/lib/postgresql/${PG_MAJOR}/lib/plv8-${PLV8_VERSION}.so" && \
/usr/bin/install -c -m 644 .//plv8.control "/usr/share/postgresql/${PG_MAJOR}/extension/" && \
/usr/bin/install -c -m 644 .//plv8.control .//plv8--${PLV8_VERSION}.sql .//upgrade/plv8--1.5.1--${PLV8_VERSION}.sql .//upgrade/plv8--2.3.7--${PLV8_VERSION}.sql .//upgrade/plv8--1.5.2--${PLV8_VERSION}.sql .//upgrade/plv8--2.3.5--${PLV8_VERSION}.sql .//upgrade/plv8--2.3.2--${PLV8_VERSION}.sql .//upgrade/plv8--1.5.5--${PLV8_VERSION}.sql .//upgrade/plv8--2.3.0--${PLV8_VERSION}.sql .//upgrade/plv8--2.0.3--${PLV8_VERSION}.sql .//upgrade/plv8--1.5.0--${PLV8_VERSION}.sql .//upgrade/plv8--2.3.8--${PLV8_VERSION}.sql .//upgrade/plv8--2.1.0--${PLV8_VERSION}.sql .//upgrade/plv8--2.3.10--${PLV8_VERSION}.sql .//upgrade/plv8--2.0.1--${PLV8_VERSION}.sql .//upgrade/plv8--2.3.6--${PLV8_VERSION}.sql .//upgrade/plv8--1.5.7--${PLV8_VERSION}.sql .//upgrade/plv8--2.1.2--${PLV8_VERSION}.sql .//upgrade/plv8--1.5.6--${PLV8_VERSION}.sql .//upgrade/plv8--2.3.3--${PLV8_VERSION}.sql .//upgrade/plv8--2.3.9--${PLV8_VERSION}.sql .//upgrade/plv8--2.0.0--${PLV8_VERSION}.sql .//upgrade/plv8--1.5.3--${PLV8_VERSION}.sql .//upgrade/plv8--2.3.4--${PLV8_VERSION}.sql .//upgrade/plv8--2.3.1--${PLV8_VERSION}.sql .//upgrade/plv8--1.5.4--${PLV8_VERSION}.sql .//plcoffee.control .//plcoffee--${PLV8_VERSION}.sql .//plls.control .//plls--${PLV8_VERSION}.sql  "/usr/share/postgresql/${PG_MAJOR}/extension/" && \
mkdir -p "/usr/lib/postgresql/${PG_MAJOR}/lib/bitcode/plv8-${PLV8_VERSION}" && \
/usr/bin/install -c -m 644 plv8.bc "/usr/lib/postgresql/${PG_MAJOR}/lib/bitcode"/plv8-${PLV8_VERSION}/./ && \
/usr/bin/install -c -m 644 plv8_type.bc "/usr/lib/postgresql/${PG_MAJOR}/lib/bitcode"/plv8-${PLV8_VERSION}/./ && \
/usr/bin/install -c -m 644 plv8_func.bc "/usr/lib/postgresql/${PG_MAJOR}/lib/bitcode"/plv8-${PLV8_VERSION}/./ && \
/usr/bin/install -c -m 644 plv8_param.bc "/usr/lib/postgresql/${PG_MAJOR}/lib/bitcode"/plv8-${PLV8_VERSION}/./ && \
/usr/bin/install -c -m 644 plv8_allocator.bc "/usr/lib/postgresql/${PG_MAJOR}/lib/bitcode"/plv8-${PLV8_VERSION}/./ && \
/usr/bin/install -c -m 644 coffee-script.bc "/usr/lib/postgresql/${PG_MAJOR}/lib/bitcode"/plv8-${PLV8_VERSION}/./ && \
/usr/bin/install -c -m 644 livescript.bc "/usr/lib/postgresql/${PG_MAJOR}/lib/bitcode"/plv8-${PLV8_VERSION}/./ && \
cd "/usr/lib/postgresql/${PG_MAJOR}/lib/bitcode" && \
llvm-lto -thinlto -thinlto-action=thinlink -o plv8-${PLV8_VERSION}.index.bc plv8-${PLV8_VERSION}/plv8.bc plv8-${PLV8_VERSION}/plv8_type.bc plv8-${PLV8_VERSION}/plv8_func.bc plv8-${PLV8_VERSION}/plv8_param.bc plv8-${PLV8_VERSION}/plv8_allocator.bc plv8-${PLV8_VERSION}/coffee-script.bc plv8-${PLV8_VERSION}/livescript.bc


RUN find /build -type f
# RUN apt-get install make
# RUN cd /build && make USE_PGXS=1 install
