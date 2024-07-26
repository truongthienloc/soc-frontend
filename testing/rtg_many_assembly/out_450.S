.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x25 , x0 , 4 
		addi    x2 , x0 , 0 
		addi    x23 , x0 , 0 
		addi    x22 , x0 , 60 
InArr:
		addi    x28 , x0 , 4 
		addi    x6 , x0 , 40 
		addi    x29 , x0 , 52 
		addi    x13 , x0 , 44 
		sh      x28 , 40 (x22) 
		sh      x6 , 44 (x22) 
		sh      x29 , 48 (x22) 
		sh      x13 , 52 (x22) 
Loop:
		slli    x4 , x23 , 2 
		add     x14 , x4 , x22 
		lh      x12 , 40 (x14) 
		add     x2 , x2 , x12 
		addi    x23 , x23 , 1 
		beq     x23 , x25 , Result 
		jal     x0 , Loop 
Result:
		addi    x31 , x0 , 140 
		bne     x31 , x2 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
