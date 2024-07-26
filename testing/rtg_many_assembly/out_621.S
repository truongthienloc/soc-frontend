.text

#The program checks the ALU instruction in I_type

Main:
		addi    x20 , x0 , 85 
		addi    x18 , x0 , 84 
		sltu    x7 , x20 , x18 
		bltu    x20 , x18 , Less_i 
		bgeu    x20 , x18 , Bigger_i 
Less_i:
		ori     x2 , x20 , 116 
		sub     x31 , x18 , x20 
		srai    x31 , x31 , 0 
		and     x31 , x31 , x0 
		addi    x24 , x0 , 0 
		beq     x31 , x24 , Pass 
Bigger_i:
		ori     x2 , x20 , 57 
		sub     x31 , x18 , x20 
		srai    x31 , x31 , 1 
		and     x31 , x31 , x0 
		addi    x24 , x0 , 0 
		beq     x31 , x24 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
