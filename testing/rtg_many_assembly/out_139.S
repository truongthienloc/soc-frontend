.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x6 , 4
		auipc    x2 , 9
		auipc    x18 , 8
		auipc    x4 , 1
		lui      x13 , 1
		lui      x22 , 2
		lui      x24 , 2
		lui      x19 , 6
		sw       x31 , 64 (x6) 
		sw       x9 , 68 (x2) 
		sw       x17 , 72 (x18) 
		sw       x20 , 76 (x4) 
		sw       x8 , 80 (x13) 
		sw       x11 , 84 (x22) 
		sw       x15 , 88 (x24) 
		sw       x12 , 92 (x19) 
		lw       x14 , 92 (x19) 
		lw       x29 , 88 (x24) 
		lw       x26 , 84 (x22) 
		lw       x10 , 80 (x13) 
		lw       x21 , 76 (x4) 
		lw       x30 , 72 (x18) 
		lw       x5 , 68 (x2) 
		lw       x3 , 64 (x6) 
		bne      x3 , x31 , Fail
		bne      x5 , x9 , Fail
		bne      x30 , x17 , Fail
		bne      x21 , x20 , Fail
		bne      x10 , x8 , Fail
		bne      x26 , x11 , Fail
		bne      x29 , x15 , Fail
		bne      x14 , x12 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
