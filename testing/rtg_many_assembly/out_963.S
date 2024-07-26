.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x19 , x0 , 4 
		add     x9 , x0 , x0 
		add     x11 , x0 , x0 
		addi    x2 , x0 , 40 
		addi    x22 , x0 , 2 
InArr:
		addi    x30 , x0 , 72 
		addi    x12 , x0 , 68 
		addi    x29 , x0 , 4 
		addi    x28 , x0 , 52 
		sh      x30 , 8 (x2) 
		sh      x12 , 12 (x2) 
		sh      x29 , 16 (x2) 
		sh      x28 , 20 (x2) 
Loop:
		sll     x24 , x11 , x22 
		add     x3 , x24 , x2 
		lhu     x23 , 8 (x3) 
		add     x9 , x9 , x23 
		addi    x11 , x11 , 1 
		beq     x11 , x19 , Result 
		jal     x0 , Loop 
Result:
		addi    x6 , x0 , 196 
		bne     x6 , x9 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
