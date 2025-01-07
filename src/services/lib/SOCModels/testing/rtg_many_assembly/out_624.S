.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x16 , x0 , 4 
		addi    x21 , x0 , 0 
		addi    x28 , x0 , 0 
		addi    x13 , x0 , 36 
InArr:
		addi    x23 , x0 , 32 
		addi    x8 , x0 , 12 
		addi    x6 , x0 , 16 
		addi    x18 , x0 , 60 
		sh      x23 , 76 (x13) 
		sh      x8 , 80 (x13) 
		sh      x6 , 84 (x13) 
		sh      x18 , 88 (x13) 
Loop:
		slli    x12 , x28 , 2 
		add     x4 , x12 , x13 
		lh      x2 , 76 (x4) 
		add     x21 , x21 , x2 
		addi    x28 , x28 , 1 
		beq     x28 , x16 , Result 
		jal     x0 , Loop 
Result:
		addi    x15 , x0 , 120 
		bne     x15 , x21 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
