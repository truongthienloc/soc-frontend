.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x3 , x0 , 4 
		add     x1 , x0 , x0 
		add     x11 , x0 , x0 
		addi    x13 , x0 , 0 
		addi    x24 , x0 , 2 
InArr:
		addi    x4 , x0 , 4 
		addi    x27 , x0 , 40 
		addi    x29 , x0 , 72 
		addi    x20 , x0 , 8 
		sh      x4 , 0 (x13) 
		sh      x27 , 4 (x13) 
		sh      x29 , 8 (x13) 
		sh      x20 , 12 (x13) 
Loop:
		sll     x9 , x11 , x24 
		add     x18 , x9 , x13 
		lhu     x23 , 0 (x18) 
		add     x1 , x1 , x23 
		addi    x11 , x11 , 1 
		beq     x11 , x3 , Result 
		jal     x0 , Loop 
Result:
		addi    x31 , x0 , 124 
		bne     x31 , x1 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
