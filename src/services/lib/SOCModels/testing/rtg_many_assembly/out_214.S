.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x16 , x0 , 4 
		addi    x30 , x0 , 0 
		addi    x27 , x0 , 0 
		addi    x28 , x0 , 12 
InArr:
		addi    x23 , x0 , 44 
		addi    x9 , x0 , 76 
		addi    x5 , x0 , 76 
		addi    x11 , x0 , 76 
		sh      x23 , 72 (x28) 
		sh      x9 , 76 (x28) 
		sh      x5 , 80 (x28) 
		sh      x11 , 84 (x28) 
Loop:
		slli    x12 , x27 , 2 
		add     x26 , x12 , x28 
		lh      x21 , 72 (x26) 
		add     x30 , x30 , x21 
		addi    x27 , x27 , 1 
		beq     x27 , x16 , Result 
		jal     x0 , Loop 
Result:
		addi    x29 , x0 , 272 
		bne     x29 , x30 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
