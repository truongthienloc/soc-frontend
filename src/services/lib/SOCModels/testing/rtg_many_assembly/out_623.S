.text

#The program checks the ALU instruction in I_type

Main:
		addi    x10 , x0 , 174 
		addi    x21 , x0 , 173 
		sltu    x2 , x10 , x21 
		bltu    x10 , x21 , Less_i 
		bgeu    x10 , x21 , Bigger_i 
Less_i:
		ori     x24 , x10 , 122 
		sub     x1 , x21 , x10 
		srai    x1 , x1 , 1 
		and     x1 , x1 , x0 
		addi    x16 , x0 , 0 
		beq     x1 , x16 , Pass 
Bigger_i:
		ori     x24 , x10 , 43 
		sub     x1 , x21 , x10 
		srai    x1 , x1 , 0 
		and     x1 , x1 , x0 
		addi    x16 , x0 , 0 
		beq     x1 , x16 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
