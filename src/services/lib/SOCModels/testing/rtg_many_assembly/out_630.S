.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x26 , 8
		auipc    x3 , 3
		auipc    x18 , 4
		auipc    x4 , 8
		lui      x20 , 4
		lui      x13 , 7
		lui      x31 , 3
		lui      x23 , 2
		sw       x17 , 36 (x26) 
		sw       x22 , 40 (x3) 
		sw       x10 , 44 (x18) 
		sw       x15 , 48 (x4) 
		sw       x5 , 52 (x20) 
		sw       x8 , 56 (x13) 
		sw       x16 , 60 (x31) 
		sw       x30 , 64 (x23) 
		lw       x19 , 64 (x23) 
		lw       x14 , 60 (x31) 
		lw       x21 , 56 (x13) 
		lw       x11 , 52 (x20) 
		lw       x6 , 48 (x4) 
		lw       x27 , 44 (x18) 
		lw       x25 , 40 (x3) 
		lw       x2 , 36 (x26) 
		bne      x2 , x17 , Fail
		bne      x25 , x22 , Fail
		bne      x27 , x10 , Fail
		bne      x6 , x15 , Fail
		bne      x11 , x5 , Fail
		bne      x21 , x8 , Fail
		bne      x14 , x16 , Fail
		bne      x19 , x30 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
