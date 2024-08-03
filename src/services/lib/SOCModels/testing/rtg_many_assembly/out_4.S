.text

#The program checks the ALU instruction in R_type

Main:
		addi    x2 , x0 , 46 
		addi    x1 , x0 , -53 
		addi    x18 , x0 , 99 
		addi    x19 , x0 , 122 
		addi    x31 , x0 , 2 
		blt     x2 , x1 , Less_r 
		bge     x2 , x1 , Bigger_r 
Less_r:
		sub     x24 , x18 , x19 
		and     x12 , x18 , x19 
		add     x12 , x12 , x24 
		srl     x12 , x12 , x31 
		addi    x16 , x0 , 18 
		bne     x12 , x16 , Fail 
Bigger_r:
		or      x24 , x18 , x19 
		xor     x12 , x18 , x19 
		add     x12 , x12 , x24 
		sra     x12 , x12 , x31 
		addi    x16 , x0 , 37 
		bne     x12 , x16 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
