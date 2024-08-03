.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x21 , 2
		auipc    x9 , 0
		auipc    x6 , 8
		auipc    x25 , 3
		lui      x12 , 9
		lui      x26 , 9
		lui      x22 , 7
		lui      x24 , 4
		sw       x7 , 40 (x21) 
		sw       x19 , 44 (x9) 
		sw       x14 , 48 (x6) 
		sw       x20 , 52 (x25) 
		sw       x5 , 56 (x12) 
		sw       x4 , 60 (x26) 
		sw       x17 , 64 (x22) 
		sw       x8 , 68 (x24) 
		lw       x1 , 68 (x24) 
		lw       x16 , 64 (x22) 
		lw       x29 , 60 (x26) 
		lw       x3 , 56 (x12) 
		lw       x13 , 52 (x25) 
		lw       x18 , 48 (x6) 
		lw       x10 , 44 (x9) 
		lw       x2 , 40 (x21) 
		bne      x2 , x7 , Fail
		bne      x10 , x19 , Fail
		bne      x18 , x14 , Fail
		bne      x13 , x20 , Fail
		bne      x3 , x5 , Fail
		bne      x29 , x4 , Fail
		bne      x16 , x17 , Fail
		bne      x1 , x8 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
