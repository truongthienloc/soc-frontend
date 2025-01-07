.text

#The program to test pop_push function
#The main purpose is to check the operation of memory instructions
#Retrieve memory addresses consecutively

Main:
		auipc    x20 , 2
		auipc    x5 , 1
		auipc    x28 , 5
		auipc    x1 , 2
		lui      x21 , 1
		lui      x3 , 9
		lui      x11 , 6
		lui      x8 , 4
		sw       x30 , 96 (x20) 
		sw       x24 , 100 (x5) 
		sw       x23 , 104 (x28) 
		sw       x18 , 108 (x1) 
		sw       x27 , 112 (x21) 
		sw       x13 , 116 (x3) 
		sw       x10 , 120 (x11) 
		sw       x2 , 124 (x8) 
		lw       x6 , 124 (x8) 
		lw       x16 , 120 (x11) 
		lw       x17 , 116 (x3) 
		lw       x14 , 112 (x21) 
		lw       x9 , 108 (x1) 
		lw       x22 , 104 (x28) 
		lw       x25 , 100 (x5) 
		lw       x26 , 96 (x20) 
		bne      x26 , x30 , Fail
		bne      x25 , x24 , Fail
		bne      x22 , x23 , Fail
		bne      x9 , x18 , Fail
		bne      x14 , x27 , Fail
		bne      x17 , x13 , Fail
		bne      x16 , x10 , Fail
		bne      x6 , x2 , Fail
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
