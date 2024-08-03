.text

#The program checks the ALU instruction in R_type

Main:
		addi    x24 , x0 , 53 
		addi    x31 , x0 , -46 
		addi    x20 , x0 , 39 
		addi    x26 , x0 , 161 
		addi    x13 , x0 , 3 
		blt     x24 , x31 , Less_r 
		bge     x24 , x31 , Bigger_r 
Less_r:
		sub     x12 , x20 , x26 
		and     x10 , x20 , x26 
		add     x10 , x10 , x12 
		srl     x10 , x10 , x13 
		addi    x22 , x0 , -12 
		bne     x10 , x22 , Fail 
Bigger_r:
		or      x12 , x20 , x26 
		xor     x10 , x20 , x26 
		add     x10 , x10 , x12 
		sra     x10 , x10 , x13 
		addi    x22 , x0 , 37 
		bne     x10 , x22 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
