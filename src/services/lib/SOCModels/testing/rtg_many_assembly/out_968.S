.text

#The program to calculate the sum of the array
#The main purpose is to check the operation of memory instructions

Main:
		addi    x28 , x0 , 4 
		add     x19 , x0 , x0 
		add     x1 , x0 , x0 
		addi    x24 , x0 , 52 
		addi    x22 , x0 , 2 
InArr:
		addi    x26 , x0 , 52 
		addi    x20 , x0 , 16 
		addi    x18 , x0 , 44 
		addi    x23 , x0 , 12 
		sh      x26 , 36 (x24) 
		sh      x20 , 40 (x24) 
		sh      x18 , 44 (x24) 
		sh      x23 , 48 (x24) 
Loop:
		sll     x29 , x1 , x22 
		add     x5 , x29 , x24 
		lhu     x13 , 36 (x5) 
		add     x19 , x19 , x13 
		addi    x1 , x1 , 1 
		beq     x1 , x28 , Result 
		jal     x0 , Loop 
Result:
		addi    x25 , x0 , 124 
		bne     x25 , x19 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
