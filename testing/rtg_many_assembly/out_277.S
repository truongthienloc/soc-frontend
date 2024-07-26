.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x13 , 4
		auipc    x30 , 0
		auipc    x2 , 4
		auipc    x10 , 7
		lui      x11 , 5
		lui      x7 , 3
		lui      x16 , 3
		lui      x24 , 7
		sw       x19 , 40 (x13) 
		sw       x3 , 44 (x30) 
		sw       x5 , 48 (x2) 
		sw       x6 , 52 (x10) 
		sw       x25 , 56 (x11) 
		sw       x15 , 60 (x7) 
		sw       x29 , 64 (x16) 
		sw       x1 , 68 (x24) 
		lw       x23 , 68 (x24) 
		lw       x14 , 64 (x16) 
		lw       x17 , 60 (x7) 
		lw       x12 , 56 (x11) 
		lw       x26 , 52 (x10) 
		lw       x21 , 48 (x2) 
		lw       x18 , 44 (x30) 
		lw       x9 , 40 (x13) 
		bne      x9 , x19 , Fail
		bne      x18 , x3 , Fail
		bne      x21 , x5 , Fail
		bne      x26 , x6 , Fail
		bne      x12 , x25 , Fail
		bne      x17 , x15 , Fail
		bne      x14 , x29 , Fail
		bne      x23 , x1 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
