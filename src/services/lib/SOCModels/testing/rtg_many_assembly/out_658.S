.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x22 , 5
		auipc    x13 , 3
		auipc    x11 , 9
		auipc    x5 , 5
		lui      x8 , 4
		lui      x18 , 2
		lui      x16 , 9
		lui      x3 , 7
		sw       x6 , 8 (x22) 
		sw       x26 , 12 (x13) 
		sw       x25 , 16 (x11) 
		sw       x29 , 20 (x5) 
		sw       x2 , 24 (x8) 
		sw       x20 , 28 (x18) 
		sw       x17 , 32 (x16) 
		sw       x4 , 36 (x3) 
		lw       x12 , 36 (x3) 
		lw       x31 , 32 (x16) 
		lw       x21 , 28 (x18) 
		lw       x14 , 24 (x8) 
		lw       x1 , 20 (x5) 
		lw       x28 , 16 (x11) 
		lw       x7 , 12 (x13) 
		lw       x27 , 8 (x22) 
		bne      x27 , x6 , Fail
		bne      x7 , x26 , Fail
		bne      x28 , x25 , Fail
		bne      x1 , x29 , Fail
		bne      x14 , x2 , Fail
		bne      x21 , x20 , Fail
		bne      x31 , x17 , Fail
		bne      x12 , x4 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
