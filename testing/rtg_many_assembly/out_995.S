.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x4 , x0 , 4 
		addi    x3 , x0 , 0 
		addi    x30 , x0 , 0 
		addi    x21 , x0 , 72 
InArr:
		addi    x9 , x0 , 28 
		addi    x8 , x0 , 64 
		addi    x15 , x0 , 8 
		addi    x5 , x0 , 32 
		sh      x9 , 12 (x21) 
		sh      x8 , 16 (x21) 
		sh      x15 , 20 (x21) 
		sh      x5 , 24 (x21) 
Loop:
		slli    x27 , x30 , 2 
		add     x17 , x27 , x21 
		lh      x29 , 12 (x17) 
		add     x3 , x3 , x29 
		addi    x30 , x30 , 1 
		beq     x30 , x4 , Result 
		jal     x0 , Loop 
Result:
		addi    x11 , x0 , 132 
		bne     x11 , x3 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
