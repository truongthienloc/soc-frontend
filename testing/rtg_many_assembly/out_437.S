.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x28 , 6
		auipc    x24 , 3
		auipc    x21 , 4
		auipc    x15 , 4
		lui      x23 , 6
		lui      x6 , 2
		lui      x9 , 9
		lui      x11 , 9
		sw       x2 , 24 (x28) 
		sw       x4 , 28 (x24) 
		sw       x13 , 32 (x21) 
		sw       x14 , 36 (x15) 
		sw       x26 , 40 (x23) 
		sw       x1 , 44 (x6) 
		sw       x31 , 48 (x9) 
		sw       x8 , 52 (x11) 
		lw       x29 , 52 (x11) 
		lw       x5 , 48 (x9) 
		lw       x20 , 44 (x6) 
		lw       x25 , 40 (x23) 
		lw       x16 , 36 (x15) 
		lw       x22 , 32 (x21) 
		lw       x17 , 28 (x24) 
		lw       x10 , 24 (x28) 
		bne      x10 , x2 , Fail
		bne      x17 , x4 , Fail
		bne      x22 , x13 , Fail
		bne      x16 , x14 , Fail
		bne      x25 , x26 , Fail
		bne      x20 , x1 , Fail
		bne      x5 , x31 , Fail
		bne      x29 , x8 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
