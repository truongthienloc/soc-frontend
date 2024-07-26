.text

#The program checks the ALU instruction in R_type

Main:
		addi    x22 , x0 , 17 
		addi    x24 , x0 , -82 
		addi    x18 , x0 , 143 
		addi    x28 , x0 , 121 
		addi    x26 , x0 , 1 
		blt     x22 , x24 , Less_r 
		bge     x22 , x24 , Bigger_r 
Less_r:
		sub     x13 , x18 , x28 
		and     x1 , x18 , x28 
		add     x1 , x1 , x13 
		srl     x1 , x1 , x26 
		addi    x29 , x0 , 15 
		bne     x1 , x29 , Fail 
Bigger_r:
		or      x13 , x18 , x28 
		xor     x1 , x18 , x28 
		add     x1 , x1 , x13 
		sra     x1 , x1 , x26 
		addi    x29 , x0 , 250 
		bne     x1 , x29 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
