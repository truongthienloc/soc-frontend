.text

#The program checks the ALU instruction in I_type

Main:
		addi    x22 , x0 , 48 
		addi    x3 , x0 , -2048 
		slti    x4 , x22 , 473 
		bltu    x22 , x3 , Less_i 
		bgeu    x22 , x3 , Bigger_i 
Less_i:
		ori     x1 , x22 , 51 
		sub     x16 , x3 , x22 
		srai    x16 , x16 , 0 
		and     x16 , x16 , x0 
		addi    x18 , x0 , 0 
		beq     x16 , x18 , Pass 
Bigger_i:
		ori     x1 , x22 , 16 
		sub     x16 , x3 , x22 
		srai    x16 , x16 , 1 
		and     x16 , x16 , x0 
		addi    x18 , x0 , 0 
		beq     x16 , x18 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
