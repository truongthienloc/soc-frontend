.text

#The program checks the ALU instruction in R_type

Main:
		addi    x8 , x0 , 75 
		addi    x12 , x0 , -24 
		addi    x22 , x0 , 121 
		addi    x19 , x0 , 121 
		addi    x28 , x0 , 1 
		blt     x8 , x12 , Less_r 
		bge     x8 , x12 , Bigger_r 
Less_r:
		sub     x31 , x22 , x19 
		and     x16 , x22 , x19 
		slt     x16 , x16 , x31 
		srl     x16 , x16 , x28 
		addi    x27 , x0 , 60 
		bne     x16 , x27 , Fail 
Bigger_r:
		or      x31 , x22 , x19 
		xor     x16 , x22 , x19 
		sltu     x16 , x16 , x31 
		sra     x16 , x16 , x28 
		addi    x27 , x0 , 60 
		bne     x16 , x27 , Fail 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
