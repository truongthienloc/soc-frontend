.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x11 , 5
		auipc    x24 , 0
		auipc    x6 , 5
		auipc    x15 , 7
		lui      x14 , 3
		lui      x8 , 6
		lui      x28 , 3
		lui      x4 , 8
		sw       x19 , 4 (x11) 
		sw       x12 , 8 (x24) 
		sw       x5 , 12 (x6) 
		sw       x20 , 16 (x15) 
		sw       x30 , 20 (x14) 
		sw       x27 , 24 (x8) 
		sw       x16 , 28 (x28) 
		sw       x22 , 32 (x4) 
		lw       x29 , 32 (x4) 
		lw       x1 , 28 (x28) 
		lw       x31 , 24 (x8) 
		lw       x7 , 20 (x14) 
		lw       x26 , 16 (x15) 
		lw       x3 , 12 (x6) 
		lw       x21 , 8 (x24) 
		lw       x10 , 4 (x11) 
		bne      x10 , x19 , Fail
		bne      x21 , x12 , Fail
		bne      x3 , x5 , Fail
		bne      x26 , x20 , Fail
		bne      x7 , x30 , Fail
		bne      x31 , x27 , Fail
		bne      x1 , x16 , Fail
		bne      x29 , x22 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
